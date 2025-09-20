
import React from "react";
import Search from "../../../../components/Search";
import AuthGate from "../../../../components/AuthGate";
import { useLocation } from 'react-router-dom';

export default function TransactionPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const accountId = params.get("accountId");
  const manualAccountId = params.get("manualAccountId");
  const privacyMode = localStorage.getItem('privacyMode') === 'true';

  return (
    <AuthGate>
      <div className="transaction-page" style={{ padding: "0rem" }}>
        <Search
          accountId={!privacyMode ? accountId : null}
          manualAccountId={privacyMode ? manualAccountId : null}
        />
      </div>
    </AuthGate>
  );
}