"use client";
import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FormData {
  title: string;
  description: string;
  category: string;
  venue: string;
  address: string;
  target: string;
  schedule: string;
  remarks: string;
  website: string;
  contact: string;
  selectedRegion: string;
  selectedPrefecture: string;
}

// 지역 데이터
const regionData = {
  "北海道・東北": [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
  ],
  関東: [
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
  ],
  中部: [
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
  ],
  近畿: [
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
  ],
  "中国・四国": [
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
  ],
  "九州・沖縄": [
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ],
};

const daysOfWeek = ["月", "火", "水", "木", "金", "土", "日"];

export default function TaisoWrite() {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  // 업로드된 이미지 파일들
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  // 이미지 미리보기 URL들
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  // 폼 데이터 상태
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    venue: "",
    address: "",
    target: "",
    schedule: "",
    remarks: "",
    website: "",
    contact: "",
    selectedRegion: "",
    selectedPrefecture: "",
  });

  // 선택된 요일들
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleRegionChange = (event: SelectChangeEvent) => {
    const region = event.target.value;
    setSelectedRegion(region);
    setSelectedPrefecture(""); // 지역 변경시 하위 지역 초기화
    setFormData((prev) => ({
      ...prev,
      selectedRegion: region,
      selectedPrefecture: "",
    }));
  };

  const handlePrefectureChange = (event: SelectChangeEvent) => {
    const prefecture = event.target.value;
    setSelectedPrefecture(prefecture);
    setFormData((prev) => ({
      ...prev,
      selectedPrefecture: prefecture,
    }));
  };

  const handleInputChange =
    (field: keyof FormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleDayChange =
    (day: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelectedDays((prev) => [...prev, day]);
      } else {
        setSelectedDays((prev) => prev.filter((d) => d !== day));
      }
    };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);

    // 미리보기 URL 생성
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleImageRemove = (index: number) => {
    // 미리보기 URL 해제
    URL.revokeObjectURL(imagePreviews[index]);

    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // FormData 생성
    const submitFormData = new FormData();

    // 텍스트 데이터 추가
    submitFormData.append("title", formData.title);
    submitFormData.append("description", formData.description);
    submitFormData.append("category", formData.category);
    submitFormData.append("venue", formData.venue);
    submitFormData.append("address", formData.address);
    submitFormData.append("target", formData.target);
    submitFormData.append("schedule", formData.schedule);
    submitFormData.append("remarks", formData.remarks);
    submitFormData.append("website", formData.website);
    submitFormData.append("contact", formData.contact);
    submitFormData.append("selectedRegion", formData.selectedRegion);
    submitFormData.append("selectedPrefecture", formData.selectedPrefecture);
    submitFormData.append("selectedDays", selectedDays.join(", "));

    // 이미지 파일들 추가
    imageFiles.forEach((file, index) => {
      submitFormData.append(`images`, file);
    });
  };

  const availablePrefectures = selectedRegion
    ? regionData[selectedRegion as keyof typeof regionData]
    : [];

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
        体操場登録
      </Typography>

      <StyledForm>
        {/* 지역 선택 */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <StyledFormControl>
            <InputLabel id="region-select-label">地域を選択</InputLabel>
            <Select
              labelId="region-select-label"
              value={selectedRegion}
              label="地域を選択"
              onChange={handleRegionChange}
            >
              {Object.keys(regionData).map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>

          {/* 하위 지역(현) 선택 */}
          <StyledFormControl disabled={!selectedRegion}>
            <InputLabel id="prefecture-select-label">
              {selectedRegion ? "都道府県を選択" : "先に地域を選択"}
            </InputLabel>
            <Select
              labelId="prefecture-select-label"
              value={selectedPrefecture}
              label={selectedRegion ? "都道府県を選択" : "先に地域を選択"}
              onChange={handlePrefectureChange}
            >
              {availablePrefectures.map((prefecture) => (
                <MenuItem key={prefecture} value={prefecture}>
                  {prefecture}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Box>

        {/* 제목 */}
        <StyledTextField
          fullWidth
          label="タイトル（제목）"
          value={formData.title}
          onChange={handleInputChange("title")}
          required
        />

        {/* 설명 */}
        <StyledTextField
          fullWidth
          label="説明（설명）"
          value={formData.description}
          onChange={handleInputChange("description")}
          multiline
          rows={4}
          required
        />

        {/* 종목 */}
        <StyledTextField
          fullWidth
          label="種目（종목）"
          value={formData.category}
          onChange={handleInputChange("category")}
          required
        />

        {/* 활동 장소 */}
        <StyledTextField
          fullWidth
          label="活動場所（활동 장소）"
          value={formData.venue}
          onChange={handleInputChange("venue")}
          required
        />

        {/* 주소 */}
        <StyledTextField
          fullWidth
          label="住所（주소）"
          value={formData.address}
          onChange={handleInputChange("address")}
          required
        />

        {/* 대상 */}
        <StyledTextField
          fullWidth
          label="対象（대상）"
          value={formData.target}
          onChange={handleInputChange("target")}
          placeholder="例: 연령-6학년"
          required
        />

        {/* 개최 일시 - 요일 선택 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
            開催日時（개최 일시）*
          </Typography>
          <FormGroup row>
            {daysOfWeek.map((day) => (
              <FormControlLabel
                key={day}
                control={
                  <StyledCheckbox
                    checked={selectedDays.includes(day)}
                    onChange={handleDayChange(day)}
                  />
                }
                label={day}
              />
            ))}
          </FormGroup>
        </Box>

        {/* 개최 일시 - 상세 */}
        <StyledTextField
          fullWidth
          label="開催日時 詳細（개최 일시 상세）"
          value={formData.schedule}
          onChange={handleInputChange("schedule")}
          placeholder="例: 9:00-9:55(연중-초등학교 6학년) / 9:55-10:50(연중-초등학교 6학년)"
        />

        {/* 비고 */}
        <StyledTextField
          fullWidth
          label="備考（비고）"
          value={formData.remarks}
          onChange={handleInputChange("remarks")}
          multiline
          rows={2}
        />

        {/* 홈페이지 */}
        <StyledTextField
          fullWidth
          label="ホームページ（홈페이지）"
          value={formData.website}
          onChange={handleInputChange("website")}
          placeholder="https://www.example.com"
        />

        {/* 문의처 */}
        <StyledTextField
          fullWidth
          label="お問い合わせ（문의처）"
          value={formData.contact}
          onChange={handleInputChange("contact")}
          placeholder="例: email@example.com"
        />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
            写真（사진）
          </Typography>

          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 2 }}
          >
            写真を選択
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {/* 이미지 미리보기 */}
          {imagePreviews.length > 0 && (
            <ImageList
              sx={{ width: "100%", height: 200 }}
              cols={4}
              rowHeight={180}
            >
              {imagePreviews.map((preview, index) => (
                <ImageListItem key={index}>
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    loading="lazy"
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                  <ImageListItemBar
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                        onClick={() => handleImageRemove(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}

          <br />
          <Typography variant="caption" color="text.secondary">
            複数の画像を選択できます。（여러 이미지 선택 가능）
          </Typography>
        </Box>

        {/* 제출 버튼 */}
        <Box
          sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "flex-end" }}
        >
          <Button variant="outlined" size="large">
            キャンセル
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{ px: 4 }}
          >
            登録する
          </Button>
        </Box>
      </StyledForm>
    </StyledPaper>
  );
}

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 800,
  margin: "0 auto",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  flex: 1,
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
    // Focus 시 outline 제거
    "&.Mui-focused": {
      outline: "none",
    },
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
  // 전체 TextField에서 outline 제거
  "& *:focus": {
    outline: "none !important",
  },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  "&.Mui-focusVisible": {
    outline: "none",
  },
  "&:focus": {
    outline: "none",
  },
}));
