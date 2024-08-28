import InformationCircleIcon from "@heroicons/react/24/outline/esm/InformationCircleIcon";
import styles from "./dashboardCss.module.css";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import ProjectCarousel from "./projectCarousel";
import Searchbar from "./searchbar";
import NavBar from "./navBar";

const ClientDashboard = () => {
  return (
    <div className="Clients-Jobs mt-5 w-full col-span-4">
      <div className="flex justify-between">
        <span className="text-2xl flex  items-center">
          {" "}
          Your Jobs
          <InformationCircleIcon className={styles.hoverInfo} />
          <p className={styles.info}>
            {" "}
            Manage your jobs and contracts efficiently: those needing urgent
            action and with time sensitivity are displayed first
          </p>
        </span>{" "}
        <Link href={"#"}>
          <button className="btn btn-primary text-white flex bg-primary-700 rounded-xl p-3">
            <PlusIcon className="h-6 w-6 mr-1" />
            Post a Job
          </button>
        </Link>
      </div>
      <ProjectCarousel />
      <div className="sticky top-[75px]  pt-5   bg-white">
        <Searchbar />
        <NavBar />
      </div>{" "}
    </div>
  );
};

export default ClientDashboard;
