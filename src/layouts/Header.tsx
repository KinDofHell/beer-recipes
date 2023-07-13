import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-orange-200 w-full p-8 flex items-center justify-around mb-5">
      <h1 className="text-4xl font-bold">BeerRecipes</h1>
      <nav className="flex items-center justify-around w-1/4 font-bold text-lg">
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">News</Link>
        <Link to="/">Contacts</Link>
      </nav>
    </header>
  );
};

export default Header;
