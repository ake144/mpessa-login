import {Separator} from "@/components/ui/separator";
import { Eye, LayoutDashboard, UserPlus } from "lucide-react";


const SideBar=()=>{
    return (
       <div className="w-64 bg-slate-800 text-white flex-shrink-0">
               <div className="p-6">
                 <h1 className="text-lg font-bold mb-8">OP-PARTNER MANAGEMENT</h1>
                 <nav className="space-y-2">
                   <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700">
                     <LayoutDashboard className="w-5 h-5" />
                     <span>Dashboard</span>
                   </div>
                   <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-600">
                     <UserPlus className="w-5 h-5" />
                     <span>Onboarding</span>
                   </div>
                   <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
                     <Eye className="w-5 h-5" />
                     <span>View</span>
                   </div>
                 </nav>
               </div>
             </div>
       
    )
}


export default SideBar;