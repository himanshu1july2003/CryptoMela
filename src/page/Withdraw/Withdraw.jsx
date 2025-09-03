import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { getWithdrawalHistory } from '@/State/WithDrawal/Action';

const Withdraw = () => {
  const dispatch = useDispatch();
  
  // Select withdrawal state from Redux store
  const withdrawal = useSelector(state => state.withdrawal);

  // Fetch withdrawal history on component mount
  useEffect(() => {
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")));
  }, [dispatch]);

  return (
    <div className="p-3 lg:p-10">
      <Button variant="outline" className='p-10'>
        <p className='font-extrabold text-5xl'>Withdrawal History</p>
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {withdrawal?.history?.length > 0 ? (
            withdrawal.history.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.date.toString() || "N/A"}</TableCell>
                <TableCell>{item.method || "N/A"}</TableCell>
                <TableCell>{item.amount || "0"}</TableCell>
                <TableCell>
                  {item.status === 'success' ? '🟢' : '🔴'} {item.status.toUpperCase() }
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No withdrawals found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Withdraw;
