import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload]
        case 'SET':
            const invertedExpenses = action.payload.reverse();
            return invertedExpenses;
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
    const [expensesState, dispatch] = useReducer(expensesReducer, []);
    
    function addExpense( expenseData ) {
        dispatch({type: 'ADD', payload: expenseData});
    }

    function setExpenses( expenses ) {
        dispatch({type: 'SET', payload: expenses});
    }

    function deleteExpense( id ) {
        dispatch({type: 'DELETE', payload: id });
    }

    function updateExpense( id, expenseData ) {
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData }});
    }

    const value = {
        expenses: expensesState,
        setExpenses: setExpenses,
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