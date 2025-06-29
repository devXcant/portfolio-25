export default function CodeEditor() {
  return (
    <div className="relative hidden lg:block">
      <div className="relative w-full h-96 transform rotate-20">
        <div className="bg-gray-800 rounded-2xl border border-gray-600 p-4 h-full shadow-2xl">
          <div className="bg-black rounded-lg h-full flex flex-col">
            {/* Browser header */}
            <div className="flex items-center gap-2 p-3 border-b border-gray-700">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4 text-xs text-green-500">Portfolio.tsx</div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 text-xs font-mono">
              <div className="space-y-1">
                <div>
                  <span className="text-purple-400">import</span>{" "}
                  <span className="text-blue-300">React</span>{" "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-orange-300">'react'</span>
                </div>
                <div>
                  <span className="text-purple-400">import</span>{" "}
                  <span className="text-yellow-300">{"{"}</span>{" "}
                  <span className="text-blue-300">useState</span>{" "}
                  <span className="text-yellow-300">{"}"}</span>{" "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-orange-300">'react'</span>
                </div>
                <div className="mt-2"></div>
                <div>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-300">Portfolio</span>{" "}
                  <span className="text-white">=</span>{" "}
                  <span className="text-yellow-300">()</span>{" "}
                  <span className="text-purple-400">=&gt;</span>{" "}
                  <span className="text-yellow-300">{"{"}</span>
                </div>
                <div className="ml-2">
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-white">[</span>
                  <span className="text-blue-300">isLoading</span>
                  <span className="text-white">,</span>{" "}
                  <span className="text-blue-300">setLoading</span>
                  <span className="text-white">]</span>{" "}
                  <span className="text-white">=</span>{" "}
                  <span className="text-yellow-300">useState</span>
                  <span className="text-white">(</span>
                  <span className="text-orange-300">false</span>
                  <span className="text-white">)</span>
                </div>
                <div className="mt-1"></div>
                <div className="ml-2">
                  <span className="text-purple-400">return</span>{" "}
                  <span className="text-yellow-300">(</span>
                </div>
                <div className="ml-4">
                  <span className="text-gray-400">&lt;</span>
                  <span className="text-red-400">div</span>{" "}
                  <span className="text-green-400">className</span>
                  <span className="text-white">=</span>
                  <span className="text-orange-300">&quot;portfolio&quot;</span>
                  <span className="text-gray-400">&gt;</span>
                </div>
                <div className="ml-6">
                  <span className="text-gray-400">&lt;</span>
                  <span className="text-red-400">Hero</span>{" "}
                  <span className="text-green-400">loading</span>
                  <span className="text-white">=</span>
                  <span className="text-yellow-300">{"{"}</span>
                  <span className="text-blue-300">isLoading</span>
                  <span className="text-yellow-300">{"}"}</span>{" "}
                  <span className="text-gray-400">/&gt;</span>
                </div>
                <div className="ml-4">
                  <span className="text-gray-400">&lt;/</span>
                  <span className="text-red-400">div</span>
                  <span className="text-gray-400">&gt;</span>
                </div>
                <div className="ml-2">
                  <span className="text-yellow-300">)</span>
                </div>
                <div>
                  <span className="text-yellow-300">{"}"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
