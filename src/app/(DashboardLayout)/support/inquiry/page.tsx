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
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

interface InquiryData {
  id: number;
  title: string;
  author: string;
  status: "未回答" | "回答済み" | "対応中";
  createdAt: string;
}

// 가데이터
const mockData: InquiryData[] = [
  {
    id: 10,
    title: "体操教室の予約方法について",
    author: "山田太郎",
    status: "未回答",
    createdAt: "2025-01-15",
  },
  {
    id: 9,
    title: "子供向けプログラムの詳細を教えてください",
    author: "佐藤花子",
    status: "回答済み",
    createdAt: "2025-01-14",
  },
  {
    id: 8,
    title: "駐車場の利用について",
    author: "鈴木一郎",
    status: "対応中",
    createdAt: "2025-01-14",
  },
  {
    id: 7,
    title: "月謝の支払い方法を変更したい",
    author: "田中美咲",
    status: "回答済み",
    createdAt: "2025-01-13",
  },
  {
    id: 6,
    title: "シニア向けプログラムはありますか？",
    author: "高橋健二",
    status: "回答済み",
    createdAt: "2025-01-12",
  },
  {
    id: 5,
    title: "体験レッスンの申し込み方法",
    author: "伊藤真理",
    status: "未回答",
    createdAt: "2025-01-11",
  },
  {
    id: 4,
    title: "休会手続きについて教えてください",
    author: "渡辺優子",
    status: "対応中",
    createdAt: "2025-01-10",
  },
  {
    id: 3,
    title: "設備の利用時間について",
    author: "小林大輔",
    status: "回答済み",
    createdAt: "2025-01-09",
  },
  {
    id: 2,
    title: "入会金の割引制度はありますか？",
    author: "中村さくら",
    status: "回答済み",
    createdAt: "2025-01-08",
  },
  {
    id: 1,
    title: "グループレッスンの人数制限について",
    author: "松本涼",
    status: "回答済み",
    createdAt: "2025-01-07",
  },
];

export default function InquiryPage() {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    console.log(`お問い合わせ詳細: ${id}`);
    // router.push(`/inquiry/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "未回答":
        return "error";
      case "対応中":
        return "warning";
      case "回答済み":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        お問い合わせ
      </Typography>

      <StyledTableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledHeaderCell align="center" width="80">
                番号
              </StyledHeaderCell>
              <StyledHeaderCell>タイトル</StyledHeaderCell>
              <StyledHeaderCell align="center" width="120">
                投稿者
              </StyledHeaderCell>
              <StyledHeaderCell align="center" width="100">
                状態
              </StyledHeaderCell>
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
                <TableCell align="center">{row.author}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={row.status}
                    color={getStatusColor(row.status)}
                    size="small"
                    sx={{ minWidth: 70 }}
                  />
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
          <Typography variant="h6">お問い合わせがありません。</Typography>
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
