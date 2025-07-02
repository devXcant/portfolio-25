export default function CodeEditor() {
  return (
    <div className="relative hidden lg:block">
      <div className="relative w-full h-[30rem] transform">
        <div className="bg-gray-800 rounded-2xl border border-gray-600 p-4 h-full shadow-2xl">
          <div className="bg-black rounded-lg h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 p-3 border-b border-gray-700">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="ml-4 text-xs text-green-500 font-mono">
                ayobamidele.tsx
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 p-4 text-xs font-mono text-gray-200 overflow-auto">
              <div className="space-y-2">
                <div>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-300">ayobamidele</span>{" "}
                  <span className="text-white">=</span>{" "}
                  <span className="text-yellow-300">()</span>{" "}
                  <span className="text-purple-400">=&gt;</span>{" "}
                  <span className="text-yellow-300">&#123;</span>
                </div>

                <div className="ml-4">
                  <span className="text-purple-400">if</span>{" "}
                  <span className="text-white">(!workingOn(&quot;</span>
                  <span className="text-orange-300">frontend</span>
                  <span className="text-white">&quot;))</span>{" "}
                  <span className="text-purple-400">&#123;</span>
                </div>
                <div className="ml-8 text-green-400">
                  start(&quot;backend microservices&quot;);
                </div>
                <div className="ml-4">
                  <span className="text-purple-400">&#125;</span>{" "}
                  <span className="text-purple-400">else</span>{" "}
                  <span className="text-purple-400">&#123;</span>
                </div>
                <div className="ml-8 text-green-400">
                  improve(&quot;frontend performance&quot;);
                </div>
                <div className="ml-4">
                  <span className="text-purple-400">&#125;</span>
                </div>

                <div className="ml-4 mt-2">
                  <span className="text-purple-400">if</span>{" "}
                  <span className="text-white">(!workingOn(&quot;</span>
                  <span className="text-orange-300">mobile</span>
                  <span className="text-white">&quot;))</span>{" "}
                  <span className="text-purple-400">&#123;</span>
                </div>
                <div className="ml-8 text-green-400">
                  build(&quot;responsive web apps&quot;);
                </div>
                <div className="ml-4">
                  <span className="text-purple-400">&#125;</span>{" "}
                  <span className="text-purple-400">else</span>{" "}
                  <span className="text-purple-400">&#123;</span>
                </div>
                <div className="ml-8 text-green-400">
                  test(&quot;React Native UI flows&quot;);
                </div>
                <div className="ml-4">
                  <span className="text-purple-400">&#125;</span>
                </div>

                <div className="ml-4 mt-2">
                  <span className="text-purple-400">if</span>{" "}
                  <span className="text-white">(!isDeployed(&quot;</span>
                  <span className="text-orange-300">cloud</span>
                  <span className="text-white">&quot;))</span>{" "}
                  <span className="text-purple-400">&#123;</span>
                </div>
                <div className="ml-8 text-green-400">
                  deploy(&quot;dockerized services on Azure&quot;);
                </div>
                <div className="ml-4">
                  <span className="text-purple-400">&#125;</span>{" "}
                  <span className="text-purple-400">else</span>{" "}
                  <span className="text-purple-400">&#123;</span>
                </div>
                <div className="ml-8 text-green-400">
                  monitor(&quot;logs and performance&quot;);
                </div>
                <div className="ml-4">
                  <span className="text-purple-400">&#125;</span>
                </div>

                <div className="ml-4 mt-2">
                  <span className="text-blue-300">return</span>{" "}
                  <span className="text-white">&quot;</span>
                  <span className="text-pink-400">
                    Always building. Always learning.
                  </span>
                  <span className="text-white">&quot;;</span>
                </div>

                <div>
                  <span className="text-yellow-300">&#125;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
