import { ReactNode , FC} from "react";

interface InfoCardProps {
    icon: ReactNode;
    label: string;
    value?: string | number;
    color?: string;
}

const InfoCard: FC<InfoCardProps> = ({ icon, label, value = "N/A", color = "bg-gray-400" }) => {
    return (
        <div
            className="flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-200 border border-gray-200/50"
            aria-label={label}
        >
            <div className={`w-14 h-14 flex items-center justify-center text-[26px] rounded-full ${color} text-white drop-shadow-xl`}>
                {icon}
            </div>
            <div>
                <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
                <span className="text-[22px] font-semibold">{value}</span>
            </div>
        </div>
    );
};

export default InfoCard;
