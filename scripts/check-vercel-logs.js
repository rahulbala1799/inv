#!/usr/bin/env node

/**
 * Script to check Vercel deployment logs
 * 
 * Usage:
 *   node scripts/check-vercel-logs.js
 * 
 * Required environment variables:
 *   - VERCEL_TOKEN: Your Vercel API token
 *   - VERCEL_PROJECT_ID: Your Vercel project ID (optional, will be auto-detected)
 *   - VERCEL_ORG_ID: Your Vercel organization ID (optional, will be auto-detected)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const VERCEL_API_BASE = 'api.vercel.com';
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_ORG_ID = process.env.VERCEL_ORG_ID;

if (!VERCEL_TOKEN) {
  console.error('❌ Error: VERCEL_TOKEN environment variable is required');
  console.error('   Get your token from: https://vercel.com/account/tokens');
  process.exit(1);
}

/**
 * Make HTTP request to Vercel API
 */
function makeRequest(endpoint, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(`https://${VERCEL_API_BASE}${endpoint}`);
    
    // Add query parameters
    if (options.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value);
        }
      });
    }

    const reqOptions = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const req = https.request(reqOptions, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    
    req.end();
  });
}

/**
 * Get user information to find org ID
 */
async function getUser() {
  try {
    const user = await makeRequest('/v2/user');
    return user;
  } catch (error) {
    console.error('Failed to get user info:', error.message);
    return null;
  }
}

/**
 * Get projects for the user/org
 */
async function getProjects(teamId = null) {
  try {
    const query = teamId ? { teamId } : {};
    const response = await makeRequest('/v9/projects', { query });
    return response.projects || [];
  } catch (error) {
    console.error('Failed to get projects:', error.message);
    return [];
  }
}

/**
 * Find project by name or use provided project ID
 */
async function findProject(projectName = 'inv') {
  if (VERCEL_PROJECT_ID) {
    return { id: VERCEL_PROJECT_ID };
  }

  const projects = await getProjects(VERCEL_ORG_ID);
  const project = projects.find(p => 
    p.name.toLowerCase() === projectName.toLowerCase()
  );

  if (!project) {
    console.error(`❌ Project "${projectName}" not found`);
    console.log('Available projects:', projects.map(p => p.name).join(', '));
    return null;
  }

  return project;
}

/**
 * Get latest deployment
 */
async function getLatestDeployment(projectId, teamId = null) {
  try {
    const query = { 
      projectId,
      limit: 1,
      ...(teamId && { teamId })
    };
    const response = await makeRequest('/v6/deployments', { query });
    const deployments = response.deployments || [];
    return deployments[0] || null;
  } catch (error) {
    console.error('Failed to get deployments:', error.message);
    return null;
  }
}

/**
 * Get deployment logs
 */
async function getDeploymentLogs(deploymentId, teamId = null) {
  try {
    const query = {
      ...(teamId && { teamId })
    };
    const response = await makeRequest(`/v2/deployments/${deploymentId}/events`, { query });
    return response || [];
  } catch (error) {
    console.error('Failed to get deployment logs:', error.message);
    return [];
  }
}

/**
 * Format and display logs
 */
function formatLogs(logs) {
  if (!logs || logs.length === 0) {
    return 'No logs available yet.';
  }

  let output = '\n📋 VERCEL DEPLOYMENT LOGS\n';
  output += '='.repeat(60) + '\n\n';

  logs.forEach((log, index) => {
    const timestamp = log.created ? new Date(log.created).toISOString() : 'N/A';
    const type = log.type || 'info';
    const payload = log.payload || {};
    
    output += `[${timestamp}] [${type.toUpperCase()}]\n`;
    
    if (payload.text) {
      output += `  ${payload.text}\n`;
    }
    
    if (payload.message) {
      output += `  ${payload.message}\n`;
    }
    
    if (payload.data && typeof payload.data === 'object') {
      output += `  ${JSON.stringify(payload.data, null, 2)}\n`;
    }
    
    output += '\n';
  });

  return output;
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Checking Vercel deployment logs...\n');

  // Get project
  const project = await findProject();
  if (!project) {
    process.exit(1);
  }

  console.log(`✅ Found project: ${project.name} (${project.id})\n`);

  // Get latest deployment
  console.log('📦 Fetching latest deployment...');
  const deployment = await getLatestDeployment(project.id, VERCEL_ORG_ID);
  
  if (!deployment) {
    console.log('⚠️  No deployments found. Waiting for deployment to start...');
    process.exit(0);
  }

  console.log(`✅ Latest deployment: ${deployment.url || deployment.id}`);
  console.log(`   State: ${deployment.readyState || 'unknown'}`);
  console.log(`   Created: ${new Date(deployment.createdAt).toISOString()}\n`);

  // Get logs
  console.log('📋 Fetching deployment logs...');
  const logs = await getDeploymentLogs(deployment.id, VERCEL_ORG_ID);
  
  if (logs.length === 0) {
    console.log('⚠️  No logs available yet. The deployment may still be in progress.');
    console.log(`   Check deployment status: https://vercel.com/${deployment.url || ''}`);
    process.exit(0);
  }

  // Format and display logs
  const formattedLogs = formatLogs(logs);
  console.log(formattedLogs);

  // Save logs to file
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const logFileName = `vercel-logs-${timestamp}.txt`;
  const logFilePath = path.join(process.cwd(), logFileName);
  
  const fileContent = [
    `Vercel Deployment Logs`,
    `Project: ${project.name} (${project.id})`,
    `Deployment: ${deployment.url || deployment.id}`,
    `State: ${deployment.readyState || 'unknown'}`,
    `Created: ${new Date(deployment.createdAt).toISOString()}`,
    `\n${'='.repeat(60)}\n`,
    formattedLogs,
  ].join('\n');

  fs.writeFileSync(logFilePath, fileContent);
  console.log(`💾 Logs saved to: ${logFileName}`);

  // Check for errors
  const hasErrors = logs.some(log => {
    const type = log.type || '';
    const payload = log.payload || {};
    return type === 'error' || 
           (payload.text && payload.text.toLowerCase().includes('error')) ||
           (payload.message && payload.message.toLowerCase().includes('error'));
  });

  if (hasErrors) {
    console.log('\n⚠️  Errors detected in deployment logs!');
    process.exit(1);
  } else {
    console.log('\n✅ No errors found in deployment logs.');
    process.exit(0);
  }
}

// Run the script
main().catch((error) => {
  console.error('❌ Fatal error:', error.message);
  console.error(error.stack);
  process.exit(1);
});
