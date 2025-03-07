import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useEffect, useState } from "react";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { HiOutlineDocumentText } from "react-icons/hi";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import InfoCard from "../../components/Cards/InfoCard";
import TaskList from "../../components/Dashboard/TaskList";
import { DashboardData } from "../../types/InterfaceTypes";



const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      if (response.data) setDashboardData(response.data);
    } catch (error) {
      console.error("Something went wrong while fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
          <InfoCard
            icon={<HiOutlineDocumentText />}
            label="Total Tasks"
            value={dashboardData?.totalTasks || "0"}
            color="bg-primary"
          />

          <InfoCard
            icon={<MdOutlinePendingActions />}
            label="Pending Tasks"
            value={dashboardData?.pendingTasks || "0"}
            color="bg-red-500"
          />

          <InfoCard
            icon={<FaTasks />}
            label="Inprogress Tasks"
            value={dashboardData?.inProgressTasks || "0"}
            color="bg-yellow-500"
          />

          <InfoCard
            icon={<AiOutlineFileDone />}
            label="Completed Tasks"
            value={dashboardData?.completedTasks || "0"}
            color="bg-green-500"
          />
        </div>
        <div className="mt-6">
          <TaskList
            tasks={dashboardData?.tasks || []}
            onSeeMore={() => navigate("/tasks")}
          />

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
