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

interface TaisoData {
  id: number;
  createdAt: string;
  region: string;
  prefecture: string;
  title: string;
  author: string;
}

// 가데이터
const mockData: TaisoData[] = [
  {
    id: 1,
    createdAt: "2025-01-15",
    region: "関東",
    prefecture: "東京都",
    title: "初心者向け体操教室 - 毎週土曜日開催",
    author: "田中太郎",
  },
  {
    id: 2,
    createdAt: "2025-01-14",
    region: "近畿",
    prefecture: "大阪府",
    title: "シニア健康体操クラブ",
    author: "山田花子",
  },
  {
    id: 3,
    createdAt: "2025-01-13",
    region: "中部",
    prefecture: "愛知県",
    title: "親子で楽しむリズム体操",
    author: "佐藤健一",
  },
  {
    id: 4,
    createdAt: "2025-01-12",
    region: "北海道・東北",
    prefecture: "北海道",
    title: "冬季特別体操プログラム",
    author: "鈴木美咲",
  },
  {
    id: 5,
    createdAt: "2025-01-11",
    region: "九州・沖縄",
    prefecture: "福岡県",
    title: "ストレッチ＆フィットネス体操",
    author: "高橋涼子",
  },
  {
    id: 6,
    createdAt: "2025-01-10",
    region: "関東",
    prefecture: "神奈川県",
    title: "朝活！モーニング体操教室",
    author: "伊藤大輔",
  },
  {
    id: 7,
    createdAt: "2025-01-09",
    region: "中国・四国",
    prefecture: "広島県",
    title: "健康増進体操サークル",
    author: "渡辺真理",
  },
  {
    id: 8,
    createdAt: "2025-01-08",
    region: "関東",
    prefecture: "埼玉県",
    title: "キッズ体操スクール - 3歳から始める",
    author: "小林優太",
  },
  {
    id: 9,
    createdAt: "2025-01-07",
    region: "近畿",
    prefecture: "京都府",
    title: "伝統的な日本体操を学ぼう",
    author: "中村さくら",
  },
  {
    id: 10,
    createdAt: "2025-01-06",
    region: "中部",
    prefecture: "静岡県",
    title: "富士山を見ながら体操クラス",
    author: "松本健二",
  },
];

export default function TaisoList() {
  const handleRowClick = (id: number) => {
    console.log(`Row clicked: ${id}`);
    // 상세 페이지로 이동 등의 처리
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        体操場リスト
      </Typography>

      <StyledTableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledHeaderCell align="center" width="120">
                作成日
              </StyledHeaderCell>
              <StyledHeaderCell align="center" width="200">
                地域
              </StyledHeaderCell>
              <StyledHeaderCell>タイトル</StyledHeaderCell>
              <StyledHeaderCell align="center" width="120">
                作成者
              </StyledHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.map((row) => (
              <StyledTableRow
                key={row.id}
                onClick={() => handleRowClick(row.id)}
              >
                <TableCell align="center">{row.createdAt}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}
                  >
                    <Chip
                      label={row.region}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={row.prefecture}
                      size="small"
                      color="secondary"
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {row.title}
                  </Typography>
                </TableCell>
                <TableCell align="center">{row.author}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* 데이터가 없을 때 */}
      {mockData.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            color: "text.secondary",
          }}
        >
          <Typography variant="h6">登録された体操場がありません。</Typography>
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
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: "bold",
  fontSize: "0.95rem",
  padding: theme.spacing(2),
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
