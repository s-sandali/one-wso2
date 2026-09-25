/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useState } from "react";
import { MenuItem, Select } from "@wso2/oxygen-ui";
import CcDashboardPage from "../cc/pages/CcDashboardPage";
import OpdDashboardScreen from "../opd/dashboard/OpdDashboardScreen";

type OverviewTab = "cc" | "opd";

const OVERVIEW_SECTIONS: { value: OverviewTab; label: string }[] = [
  { value: "cc", label: "Credit Card Expenses" },
  { value: "opd", label: "OPD Claims" },
];

/**
 * Finance → Overview. Used to be a rail group that expanded into two rows —
 * Credit Card Expenses, OPD Claims — each its own click before you reached
 * either dashboard. This is the one screen the rail now sends you to; the
 * dropdown does the switching that used to be a second click in the sidebar.
 *
 * No header of its own — the dropdown rides on the same line as whichever
 * dashboard's own eyebrow chip is showing, via `FinanceShell`'s `actions`
 * slot (see `headerActions` below), rather than sitting above it as a
 * second, redundant title.
 *
 * Neither dashboard changed to get here — each is still the exact same
 * default-exported page (own eyebrow chip, title, config-gating, loading and
 * error states), just chosen by the dropdown instead of a route.
 * `OpdDashboardScreen` in particular still enforces its own finance-approver
 * role check internally, so someone without it sees that screen's own
 * notice, not a missing option.
 */
export default function FinanceOverviewPage() {
  const [section, setSection] = useState<OverviewTab>("cc");

  const switcher = (
    <Select
      size="small"
      value={section}
      onChange={(e) => setSection(e.target.value as OverviewTab)}
      inputProps={{ "aria-label": "Overview section" }}
      sx={{ minWidth: 220 }}
    >
      {OVERVIEW_SECTIONS.map((s) => (
        <MenuItem key={s.value} value={s.value}>
          {s.label}
        </MenuItem>
      ))}
    </Select>
  );

  return section === "cc" ? (
    <CcDashboardPage headerActions={switcher} />
  ) : (
    <OpdDashboardScreen headerActions={switcher} />
  );
}
