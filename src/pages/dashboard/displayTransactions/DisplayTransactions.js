import React, { useRef } from 'react'
import moment from 'moment';

const DisplayTransactions = (props) => {
    console.log(props);
    // const transactions = [{ id: 1, description: 'burger', type: 'debit', category: 'food', amount: 100, date: '2019-01-01' }, { id: 1, description: 'burger', type: 'debit', category: 'food', amount: 100, date: '2019-01-01' }, { id: 1, description: 'burger', type: 'debit', category: 'food', amount: 100, date: '2019-01-01' }]
    return (
        <div className='display-transaction-div'>
            <table className='transaction-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                     props.userObj.expenses &&   props.userObj.expenses.map((transaction, index) => {
                         console.log(transaction);
                            return (
                                <tr  key={index}>
                                    <td className='td td-id'>{transaction.id}</td>
                                    <td className='td td-description'>{transaction.description}</td>
                                    <td className='td td-category'>{transaction.category}</td>
                                    <td className='td td-amount'>{transaction.amount} <span>Rs</span></td>
                                    <td className='td td-date'>{moment(transaction.createdAt.toDate()).format('YYYY-MM-DD HH:mm') }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>



            </table>

        </div>
    )
}

export default DisplayTransactions