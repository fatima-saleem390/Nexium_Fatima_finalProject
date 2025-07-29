export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-8 border-t-8 border-blue-800">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          We’re here to help! Reach out to us anytime using the details below.
        </p>

        <div className="space-y-4 text-center text-gray-800">
          <div>
            <h2 className="text-lg font-bold text-blue-900">Office Address</h2>
            <p>123 Grand Avenue, Suite 456</p>
            <p>Lahore, Pakistan</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-blue-900">Phone</h2>
            <p>+92 300 1234567</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-blue-900">Support Hours</h2>
            <p>Monday - Friday: 9am - 6pm</p>
            <p>Saturday: 10am - 4pm</p>
          </div>
        </div>
      </div>
    </main>
  );
}
