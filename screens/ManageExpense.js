import { useLayoutEffect,useContext, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../components/UI/IconButton';

import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { AuthContext } from '../store/auth-context';

import { storeExpense, updateExpense, deleteExpense } from '../utils/http';


function ManageExpense({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);
    const authCtx = useContext(AuthContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === editedExpenseId
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? '出費の編集' : '出費の追加',
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId, authCtx.token);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        }
        catch (error) {
            setError('データの削除に失敗しました。');
            setIsSubmitting(false);
        }
    }
    function cancelHandler() {
        navigation.goBack();
    }
    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                expensesCtx.updateExpense(editedExpenseId, expenseData, authCtx.token);
                await updateExpense(editedExpenseId, expenseData, authCtx.token);
            } else {
                const id = await storeExpense(expenseData, authCtx.token);
                expensesCtx.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();
        } catch (error) {
            console.log(error.response.data); // エラーレスポンスの詳細をログに出力
            console.log(error.response.status); // HTTPステータスコードをログに出力
            console.log(error.response.headers); // レスポンスヘッダーをログに出力
            setError('データの保存に失敗しました。');
            setIsSubmitting(false);
        }
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} />;
    }
        

    if (isSubmitting) {
        return <LoadingOverlay />;
    }
    

    return (
        <View style={styles.container}>
            <ExpenseForm
                submitButtonLabel={isEditing ? '更新' : '追加'}
                onSubmit={confirmHandler}
                onCancel={cancelHandler}
                defaultValues={selectedExpense}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        size={36}
                        color={GlobalStyles.colors.error500}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTob: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
});