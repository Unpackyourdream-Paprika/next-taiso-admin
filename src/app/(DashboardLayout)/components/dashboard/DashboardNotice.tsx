import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";

const notices = [
  {
    id: 10,
    title: "2025年体操場運営時間変更のお知らせ",
  },
  {
    id: 9,
    title: "新規体操プログラム開設のご案内",
  },
  {
    id: 8,
    title: "年末年始休館日のお知らせ",
  },
  {
    id: 7,
    title: "1月体操場利用規則アップデートについて",
  },
  {
    id: 6,
    title: "冬季安全規則のご案内",
  },
];

const DashboardNotice = () => {
  return (
    <DashboardCard title="お知らせ">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Table
          aria-label="notice table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "60px" }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  番号
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  タイトル
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notices.map((notice) => (
              <TableRow
                key={notice.id}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {notice.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "400px",
                    }}
                  >
                    {notice.title}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default DashboardNotice;
