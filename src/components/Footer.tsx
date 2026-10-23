export default function Footer() {
  return (
    <footer className="w-full border-t border-black bg-green-100 text-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6 py-4 text-sm">
        {/* Left side */}
        <p className="font-semibold">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right side */}
        <p className="italic text-gray-600 mt-2 sm:mt-0">
          “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
        </p>
      </div>
    </footer>
  );
}
