import React from 'react'
import { Currency } from 'maki-pulsechain-sdk';
import { Button } from 'maki-toolkit'
import { AutoRow, RowBetween } from 'components/Row'
import { ApprovalState } from 'hooks/useApproveCallback';
import Loader from 'components/Loader';

type ApprovalButtonProps = {
  onClick?: () => Promise<void> | void;
  approvalState: ApprovalState;
  currentyInput: Currency;
}
export const ApprovalButton: React.FC<ApprovalButtonProps> = ({ approvalState, currentyInput, onClick }) => {
  return (
    <Button
      onClick={onClick}
      disabled={approvalState !== ApprovalState.NOT_APPROVED}
      width='100%'
      variant={approvalState === ApprovalState.APPROVED ? 'success' : 'primary'}
    >
      {approvalState === ApprovalState.PENDING ? (
        <AutoRow gap="6px" justify="center">
          Approving <Loader stroke="white" />
        </AutoRow>
      ) : approvalState === ApprovalState.APPROVED ? (
        'Approved'
      ) : (
        `Approve ${currentyInput?.symbol}`
      )}
    </Button>
  )
}
