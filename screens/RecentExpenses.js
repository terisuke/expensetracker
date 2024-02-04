import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { useContext, useEffect, useState } from 'react';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);
    // const[fetchedExpenses, setFetchedExpenses] = useState([]);

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                // setFetchedExpenses(expenses);
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError('データの取得に失敗しました。');
            }
            setIsFetching(false);
            
        }
        getExpenses();
    }, []);

    if (error && !isFetching) {
        return <ErrorOverlay message={error}/>;
    }
    if (isFetching) {
        return <LoadingOverlay />;
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return (expense.date >= date7DaysAgo) && (expense.date <= today);
    });


    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="最近1週間"
            fallbackText="直近の支出は登録されていません"
        />
    );
}

export default RecentExpenses;