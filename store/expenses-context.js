import { createContext, useReducer } from 'react';
const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'お菓子',
        amount: 108,
        date: new Date('2024-1-12'),
    },
    {
        id: 'e2',
        description: '本',
        amount: 3200,
        date: new Date('2024-1-13'),
    },
    {
        id: 'e3',
        description: 'お茶',
        amount: 210,
        date: new Date('2024-1-16'),
    },
    {
        id: 'e4',
        description: 'お茶',
        amount: 210,
        date: new Date('2024-1-21'),
    },
    {
        id: 'e5',
        description: '財布',
        amount: 5500,
        date: new Date('2024-1-24'),
    },
    {
        id: 'e6',
        description: '印刷紙',
        amount: 3200,
        date: new Date('2024-1-27'),
    },
    {
        id: 'e7',
        description: '通院',
        amount: 2100,
        date: new Date('2024-1-27'),
    },
    {
        id: 'e8',
        description: 'ケーキ',
        amount: 580,
        date: new Date('2024-1-29'),
    },
    {
        id: 'e9',
        description: 'コーラ',
        amount: 198,
        date: new Date('2024-1-30'),
    }
];


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString(); + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
    
    function addExpense( expenseData ) {
        dispatch({type: 'ADD', payload: expenseData});
    }

    function deleteExpense( id ) {
        dispatch({type: 'DELETE', payload: id });
    }

    function updateExpense( id, expenseData ) {
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData }});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    );
}

export default ExpensesContextProvider;