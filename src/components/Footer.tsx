export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-bg mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
        <p>&copy; {new Date().getFullYear()} DevVault</p>
        <div className="flex items-center gap-4">
          <a
            href="/feed.xml"
            className="hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            RSS
          </a>
          <a
            href="https://github.com/lazaaro01/DevNote"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
