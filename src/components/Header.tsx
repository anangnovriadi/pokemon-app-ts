const Header = ({ title }: HeaderProps) => {
  return (
    <>
      <div className="text-center">
        <nav className="bg-white border-gray-200 dark:bg-gray-900 p-4 text-white">
          <a href="/" className="text-xl">{title}</a>
        </nav>
      </div>
    </>
  )
}

interface HeaderProps {
  title: string;
}

export default Header;
