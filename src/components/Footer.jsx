const Footer = () => {
  return (
    <footer className="bg-base-200 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-sm">
          © {new Date().getFullYear()} Social Development Events. All rights
          reserved.
        </p>
        <p className="text-sm">Built with React, Tailwind, DaisyUI</p>
      </div>
    </footer>
  );
};

export default Footer;
