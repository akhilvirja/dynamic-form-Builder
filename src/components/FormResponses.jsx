import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table'

function FormResponses({responses}) {
  return (
    <>
        <Table>
            <TableCaption>A list of your recent Responses.</TableCaption>
            <TableHeader>
                <TableRow>
                    {
                        Object.keys(responses[0].responses).map((title) => (
                            <TableHead>{title}</TableHead>
                        ))
                    }
                    <TableHead>Submitted At</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    responses.map((responseObj) => {
                        return(
                            <TableRow>
                                {
                                    console.log(Object.values(responseObj.responses))
                                }
                                {   
                                    Object.values(responseObj.responses).map((value) =>(
                                        <TableCell>{String(value)}</TableCell>
                                    ))
                                }
                                <TableCell>{responseObj.submittedAt}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>

            {/* <TableBody>
                {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                </TableRow>
                ))}
            </TableBody> */}
            {/* <TableFooter>
                <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter> */}
        </Table>
    </>
  )
}

export default FormResponses