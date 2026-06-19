

const footerColumns = [
  {
    title: 'Solutions',
    links: ['Power Infrastructure', 'Cooling Infrastructure', 'Network Infrastructure', 'Physical Infrastructure'],
  },
  {
    title: 'Regions',
    links: ['North America', 'Morocco', 'West Africa'],
  },
  {
    title: 'Resources',
    links: ['Case Studies', 'White Papers', 'Data Center Guide', 'ROI Calculator'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Partners', 'Contact'],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 relative flex-shrink-0">
                <div className="absolute inset-0 border border-emerald-500/50 rotate-45" />
                <div className="absolute inset-[3px] bg-emerald-500/15 rotate-45" />
              </div>
              <span className="text-white font-semibold text-sm font-display">
                Aether AI
              </span>
            </div>
            <p className="text-xs text-white/25 leading-relaxed max-w-[180px]">
              AI agents that actually get work done for you.
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs text-white/50 uppercase tracking-[0.15em] mb-5 font-medium font-body">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-white/25 hover:text-white/60 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/[0.05] mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Aether AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-white/20 hover:text-white/40 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
