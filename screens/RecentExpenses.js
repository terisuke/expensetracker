import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { useContext, useEffect, useState } from 'react';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';

function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    // const[fetchedExpenses, setFetchedExpenses] = useState([]);

    useEffect(() => {
        async function getExpenses() {
            const expenses = await fetchExpenses();
            // setFetchedExpenses(expenses);
            expensesCtx.setExpenses(expenses);
        }
        getExpenses();
    }, []);

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