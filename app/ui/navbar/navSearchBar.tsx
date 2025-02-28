import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const NavSearchBar = () => {
  return (
    <>
      <MagnifyingGlassIcon className="h-8 w-8 xl:hidden mr-2" />
      <form
        className=" xl:flex hidden items-center divide-x rounded-full border-2 p-1 border-slate-200  gap-1 hover:bg-slate-200
            "
      >
        <div className="relative">
          <label htmlFor="search"></label>
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="  w-full block bg-inherit rounded-full border-0 py-[5px] pl-10  
                     placeholder:text-gray-500 "
          />
          <MagnifyingGlassIcon className="pointer-events-none  absolute left-3 top-1/2 h-[20px] w-[20px] -translate-y-1/2 text-black peer-focus:text-gray-900" />
        </div>
        <div>
          <label htmlFor="search"></label>
          <select
            name="jobs"
            id="job"
            className=" w-full block  rounded-full border-0 py-[5px] pl-5 bg-inherit hover:bg-white  placeholder:text-gray-500 "
          >
            <option value="job">Jobs</option>
            <option value="Projects">Projects</option>
            <option value="Talents">Talents</option>
          </select>
        </div>
      </form>
    </>
  );
};

export default NavSearchBar;
