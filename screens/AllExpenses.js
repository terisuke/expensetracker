import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { useContext,useEffect } from 'react';

function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    useEffect(() => {
        // 日付が新しい順にソート
        const sortedExpenses = expensesCtx.expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
        expensesCtx.setExpenses(sortedExpenses);
    }, []);

    return (
        <ExpensesOutput
            expenses={expensesCtx.expenses}
            expensesPeriod="全ての支出"
            fallbackText="支出は登録されていません"
        />
    );
}
export default AllExpenses;