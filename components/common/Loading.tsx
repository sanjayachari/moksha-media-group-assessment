export const Loading = () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 p-8 text-center animate-pulse">
      {/* Main spinner with glow */}
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 rounded-3xl blur-xl absolute inset-0 animate-pulse opacity-75" />
        <div className="w-16 h-16 bg-gradient-to-r from-neutral-900 via-blue-600 to-neutral-900 rounded-2xl shadow-2xl flex items-center justify-center relative z-10 animate-spin">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <svg className="w-7 h-7 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Loading text with shimmer */}
      <div className="space-y-2">
        <div className="h-6 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-xl w-48 mx-auto blur-sm" />
        <div className="h-4 bg-neutral-200 rounded-lg w-64 mx-auto" />
      </div>

      {/* Progress bars */}
      <div className="w-full max-w-md space-y-3">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <div className="w-3 h-3 bg-neutral-300 rounded-full animate-pulse" />
          <span>Loading data</span>
        </div>
        <div className="w-full h-2 bg-neutral-200/50 rounded-2xl overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-neutral-600 rounded-2xl animate-[width_2s_ease-in-out_infinite]" style={{ width: '0%' }} />
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <div className="w-3 h-3 bg-neutral-300 rounded-full animate-pulse delay-200" />
          <span>Preparing interface</span>
        </div>
        <div className="w-full h-2 bg-neutral-200/50 rounded-2xl overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl animate-[width_2s_ease-in-out_1.5s_infinite]" style={{ width: '0%' }} />
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <div className="w-3 h-3 bg-neutral-300 rounded-full animate-pulse delay-500" />
          <span>Almost ready</span>
        </div>
        <div className="w-full h-2 bg-neutral-200/50 rounded-2xl overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl animate-[width_2s_ease-in-out_3s_infinite]" style={{ width: '0%' }} />
        </div>
      </div>

      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 rounded-full animate-pulse delay-1000" />
      </div>
    </div>
  )