import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            Invoice App
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold">
              Just €5/month
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            The Best Invoice App
            <br />
            <span className="text-indigo-600">in the World</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create professional invoices in seconds. No accounting degree required. 
            Simple, fast, and secure. Perfect for freelancers and small businesses.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/signup"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Start Free Trial
            </Link>
            <Link
              href="#features"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              See How It Works
            </Link>
          </div>

          {/* Pricing Highlight */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 max-w-md mx-auto border-2 border-indigo-100">
            <div className="text-5xl font-bold text-indigo-600 mb-2">€5</div>
            <div className="text-gray-500 mb-4">per month</div>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Unlimited invoices</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Unlimited customers</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>PDF downloads</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Multiple templates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="max-w-6xl mx-auto mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Everything You Need, Nothing You Don't
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Create and send invoices in seconds. No complicated forms or confusing workflows.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bank-Level Security</h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security. Multi-tenant isolation guaranteed.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Professional PDFs</h3>
              <p className="text-gray-600">
                Generate beautiful, branded invoices that look professional every time.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-24 bg-indigo-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of freelancers and small businesses who trust Invoice App
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Start Your Free Trial
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Invoice App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
