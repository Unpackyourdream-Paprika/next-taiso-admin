"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";

interface NoticeData {
  id: number;
  title: string;
  createdAt: string;
}

// 가데이터
const mockData: NoticeData[] = [
  {
    id: 10,
    title: "2025年体操場運営時間変更のお知らせ",
    createdAt: "2025-01-15",
  },
  {
    id: 9,
    title: "新規体操プログラム開設のご案内",
    createdAt: "2025-01-14",
  },
  {
    id: 8,
    title: "年末年始休館日のお知らせ",
    createdAt: "2025-01-13",
  },
  {
    id: 7,
    title: "1月体操場利用規則アップデートについて",
    createdAt: "2025-01-12",
  },
  {
    id: 6,
    title: "冬季安全規則のご案内",
    createdAt: "2025-01-10",
  },
  {
    id: 5,
    title: "体操場施設補修工事日程のお知らせ",
    createdAt: "2025-01-08",
  },
  {
    id: 4,
    title: "会員登録システムメンテナンスのお知らせ",
    createdAt: "2025-01-05",
  },
  {
    id: 3,
    title: "新年のご挨拶と営業開始のお知らせ",
    createdAt: "2025-01-02",
  },
  {
    id: 2,
    title: "体操教室料金改定のお知らせ",
    createdAt: "2024-12-28",
  },
  {
    id: 1,
    title: "体操場ホームページリニューアルのお知らせ",
    createdAt: "2024-12-25",
  },
];

export default function NoticesPage() {
  const router = useRouter();

  const handleCreateClick = () => {
    console.log("作成ページへ移動");
    // router.push('/notices/create');
  };

  const handleRowClick = (id: number) => {
    console.log(`お知らせ詳細: ${id}`);
    // router.push(`/notices/${id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          お知らせ
        </Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleCreateClick}
          sx={{
            px: 3,
            py: 1,
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          作成する
        </Button>
      </Box>

      <StyledTableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledHeaderCell align="center" width="80">
                番号
              </StyledHeaderCell>
              <StyledHeaderCell>タイトル</StyledHeaderCell>
              <StyledHeaderCell align="center" width="120">
                作成日
              </StyledHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.map((row) => (
              <StyledTableRow
                key={row.id}
                onClick={() => handleRowClick(row.id)}
              >
                <TableCell align="center" sx={{ fontWeight: 500 }}>
                  {row.id}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ cursor: "pointer" }}>
                    {row.title}
                  </Typography>
                </TableCell>
                <TableCell align="center">{row.createdAt}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* データがない場合 */}
      {mockData.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            color: "text.secondary",
          }}
        >
          <Typography variant="h6">お知らせがありません。</Typography>
        </Box>
      )}
    </Box>
  );
}

// Styled Components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  backgroundColor: "#fff",
}));

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  fontWeight: "bold",
  fontSize: "0.95rem",
  padding: theme.spacing(2),
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
