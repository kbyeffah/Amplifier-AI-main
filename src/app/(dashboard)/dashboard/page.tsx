// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { getUserAppointments } from '@/actions/appointment';
// import {
//   getUserBalance,
//   getUserClients,
//   getUserPlanInfo,
//   getUserTotalProductPrices,
//   getUserTransactions,
// } from '@/actions/dashboard';
// import DashboardCard from '@/components/dashboard/cards';
// import { PlanUsage } from '@/components/dashboard/plan-usage';
// import InfoBar from '@/components/infobar';
// import { Separator } from '@/components/ui/separator';
// import CalIcon from '@/icons/cal-icon';
// import PersonIcon from '@/icons/person-icon';
// import { TransactionsIcon } from '@/icons/transactions-icon';
// import { DollarSign } from 'lucide-react';

// export default async function Page() {
//   const { userId } = auth();
//   if (!userId) {
//     redirect('/auth/sign-in');
//   }

//   try {
//     const clients = (await getUserClients()) || 0;
//     const sales = (await getUserBalance()) || 0;
//     const bookings = (await getUserAppointments()) || 0;
//     const plan = (await getUserPlanInfo()) || { plan: 'Free', credits: 0, domains: 0 };
//     const transactions = (await getUserTransactions()) || { data: [] };
//     const products = (await getUserTotalProductPrices()) || 0;

//     console.log({ clients, sales, bookings, plan, transactions, products });

//     return (
//       <div className="min-h-screen w-full bg-gray-100">
//         <InfoBar />
//         <div className="container mx-auto p-4">
//           <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
//           <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10">
//             <DashboardCard
//               value={clients}
//               title="Potential Clients"
//               icon={<PersonIcon />}
//             />
//             <DashboardCard
//               value={products * clients}
//               sales
//               title="Pipeline Value"
//               icon={<DollarSign />}
//             />
//             <DashboardCard
//               value={bookings}
//               title="Appointments"
//               icon={<CalIcon />}
//             />
//             <DashboardCard
//               value={sales}
//               sales
//               title="Total Sales"
//               icon={<DollarSign />}
//             />
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             <div>
//               <h2 className="font-bold text-2xl mb-2">Plan Usage</h2>
//               <p className="text-sm font-light mb-4">
//                 A detailed overview of your metrics, usage, customers and more
//               </p>
//               <PlanUsage
//                 plan={plan.plan}
//                 credits={plan.credits}
//                 domains={plan.domains}
//                 clients={clients}
//               />
//             </div>
//             <div>
//               <div className="flex justify-between items-center mb-5">
//                 <div className="flex gap-3 items-center">
//                   <TransactionsIcon />
//                   <p className="font-bold">Recent Transactions</p>
//                 </div>
//                 <p className="text-sm">See more</p>
//               </div>
//               <Separator orientation="horizontal" />
//               {transactions.data.length > 0 ? (
//                 transactions.data.map((transaction) => (
//                   <div
//                     className="flex gap-3 w-full justify-between items-center border-b-2 py-5"
//                     key={transaction.id}
//                   >
//                     <p className="font-bold">
//                       {transaction.calculated_statement_descriptor}
//                     </p>
//                     <p className="font-bold text-xl">
//                       ${transaction.amount / 100}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 mt-4">No recent transactions.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   } catch (error) {
//     console.error('Dashboard data fetch error:', error);
//     return (
//       <div className="min-h-screen w-full bg-gray-100 p-4 text-red-500">
//         Error loading dashboard. Please try again.
//       </div>
//     );
//   }
// }

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserAppointments } from '@/actions/appointment';
import {
  getUserBalance,
  getUserClients,
  getUserPlanInfo,
  getUserTotalProductPrices,
  getUserTransactions,
} from '@/actions/dashboard';
import DashboardCard from '@/components/dashboard/cards';
import { PlanUsage } from '@/components/dashboard/plan-usage';
import InfoBar from '@/components/infobar';
import { Separator } from '@/components/ui/separator';
import CalIcon from '@/icons/cal-icon';
import PersonIcon from '@/icons/person-icon';
import { TransactionsIcon } from '@/icons/transactions-icon';
import { DollarSign } from 'lucide-react';

export default async function Page() {
  const { userId } = auth();
  if (!userId) {
    redirect('/auth/sign-in');
  }

  const clients = await getUserClients();
  const sales = await getUserBalance();
  const bookings = await getUserAppointments();
  const plan = await getUserPlanInfo();
  const transactions = await getUserTransactions();
  const products = await getUserTotalProductPrices();

  console.log({ clients, sales, bookings, plan, transactions, products });

  return (
    <div className="min-h-screen bg-gray-100 p-5 flex flex-col">
      <InfoBar />
      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex gap-5 flex-wrap">
          <DashboardCard
            value={clients || 0}
            title="Potential Clients"
            icon={<PersonIcon />}
          />
          <DashboardCard
            value={products! * clients! || 0}
            sales
            title="Pipline Value"
            icon={<DollarSign />}
          />
          <DashboardCard
            value={bookings || 0}
            title="Appointments"
            icon={<CalIcon />}
          />
          <DashboardCard
            value={sales || 0}
            sales
            title="Total Sales"
            icon={<DollarSign />}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10">
          <div>
            <h2 className="font-bold text-2xl">Plan Usage</h2>
            <p className="text-sm text-gray-600">
              A detailed overview of your metrics, usage, customers and more
            </p>
            <PlanUsage
              plan={plan?.plan!}
              credits={plan?.credits || 0}
              domains={plan?.domains || 0}
              clients={clients || 0}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-5">
              <div className="flex gap-3 items-center">
                <TransactionsIcon />
                <p className="font-bold">Recent Transactions</p>
              </div>
              <p className="text-sm">See more</p>
            </div>
            <Separator orientation="horizontal" />
            {transactions &&
              transactions.data.map((transaction) => (
                <div
                  className="flex justify-between items-center border-b-2 py-5"
                  key={transaction.id}
                >
                  <p className="font-bold">
                    {transaction.calculated_statement_descriptor}
                  </p>
                  <p className="font-bold text-xl">
                    ${transaction.amount / 100}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}