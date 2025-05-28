import { useEffect, useState } from "react";


export default function Footer() {


return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto fixed bottom-0 left-0 right-0">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
             for calculations
          </p>
          <p className="text-xs text-gray-500 mt-2">
            © {new Date().getFullYear()} Calculator App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
)



}
