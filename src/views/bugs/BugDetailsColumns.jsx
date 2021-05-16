import { format } from "date-fns";
import { ColumnFilter } from "./BugDetailsColumnFilter";

export const COLUMNS = [
  {
    Header: "Bug Id",
    // Footer: "Bug Id",
    accessor: "bugId",
  },
  {
    Header: "Type",
    // Footer: "Type",
    accessor: "issueType",
  },
  {
    Header: "Component",
    // Footer: "Component",
    accessor: "component",
  },

  {
    Header: "Bug Title",
    // Footer: "Bug Title",
    accessor: "bugTitle",
  },

  // {
  //   Header: "OS",
  //   accessor: "os",
  // },
  // {
  //   Header: "Issue SubType",
  //   accessor: "issueSubType",
  // },
  // {
  //   Header: "Severity",
  //   accessor: "severity",
  // },
  {
    Header: "Reported",
    // Footer: "Reported",
    accessor: "reportVersion",
  },
  {
    Header: "Regression",
    // Footer: "Regression",
    accessor: "regressionVersion",
  },
  {
    Header: "Fix",
    // Footer: "Fix",
    accessor: "fixVersion",
  },
  {
    Header: "Assignee",
    // Footer: "Assignee",
    accessor: "assignee",
  },
  {
    Header: "Priority",
    // Footer: "Priority",
    accessor: "priority",
  },

  // {
  //   Header: "Browser",
  //   accessor: "browser",
  // },
  ///////////////////////////////

  // {
  //   Header: "Bug Desc",
  //   accessor: "bugDesc",
  // },
  // {
  //   Header: "Reproducible Steps",
  //   accessor: "reproducibleSteps",
  // },
  // {
  //   Header: "Expected Output",
  //   accessor: "expectedOutput",
  // },
  // {
  //   Header: "Actual Output",
  //   accessor: "actualOutput",
  // },
  // {
  //   Header: "SourceCode",
  //   accessor: "sourceCode",
  // },
  // {
  //   Header: "Attachment",
  //   accessor: "attachment",
  // },
  // {
  //   Header: "Workaround",
  //   accessor: "workaround",
  // },
  // {
  //   Header: "Submitter",
  //   accessor: "submitterName",
  // },
  ///////////////////////
  // {
  //   Header: "Submitter Email",
  //   accessor: "submitterEmail",
  // },
  // {
  //   Header: "Submitter Company",
  //   accessor: "submitterCompany",
  // },

  {
    Header: "ETA",
    // Footer: "ETA",
    accessor: "eta",
  },
  {
    Header: "Resolution",
    // Footer: "Resolution",
    accessor: "resolution",
  },
  {
    Header: "State",
    // Footer: "State",
    accessor: "state",
  },
  {
    Header: "Created Time",
    // Footer: "Created Time",
    accessor: "createdTime",
    // Cell: ({ value }) => {
    //   return format(new Date(value), "dd/MMM/yyyy");
    // },
  },
];
// export const GROUPED_COLUMNS = [
//   {
//     Header: "Info",
//     Footer: "Info",
//     columns: [
//       {
//         Header: "Type",
//         Footer: "Type",
//         accessor: "issueType",
//       },
//       {
//         Header: "Component",
//         Footer: "Component",
//         accessor: "component",
//       },
//       {
//         Header: "Bug Id",
//         Footer: "Bug Id",
//         accessor: "bugId",
//       },
//       {
//         Header: "Bug Title",
//         Footer: "Bug Title",
//         accessor: "bugTitle",
//       },
//     ],
//   },
//   {
//     Header: "Version",
//     Footer: "Version",
//     columns: [
//       {
//         Header: "Reported",
//         Footer: "Reported",
//         accessor: "reportVersion",
//       },
//       {
//         Header: "Regression",
//         Header: "Regression",
//         accessor: "regressionVersion",
//       },
//       {
//         Header: "Fix",
//         Footer: "Fix",
//         accessor: "fixVersion",
//       },
//     ],
//   },
//   {
//     Header: "Status",
//     Footer: "Status",
//     columns: [
//       {
//         Header: "ETA",
//         Footer: "ETA",
//         accessor: "eta",
//       },
//       {
//         Header: "Resolution",
//         Footer: "Resolution",
//         accessor: "resolution",
//       },
//       {
//         Header: "State",
//         Footer: "State",
//         accessor: "state",
//       },
//     ],
//   },
//   {
//     Header: "Created Time",
//     Footer: "Created Time",
//     accessor: "createdTime",
//   },
// ];
