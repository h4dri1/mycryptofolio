import WalletsNav from './WalletsNav';
import AssetsShares from './AssetsShares';
import Performance from './Performance';
import TransactionsHistory from './TransactionsHistory';
import TransactionCreator from './TransactionCreator';

const Dashboard = () => (
    <div className="">
        <WalletsNav />
        <AssetsShares />
        <Performance />
        <TransactionsHistory />
        <TransactionCreator />
    </div>
);

export default Dashboard;
