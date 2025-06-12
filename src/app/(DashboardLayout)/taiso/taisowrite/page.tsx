"use client";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
  Typography,
  TextField,
  Button,
  Paper,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { api, CreateBoardResponse } from "@/utils/api";

// API 응답 타입 정의
interface Region {
  regionId: number;
  regionName: string;
}

interface CityData {
  cityId: number;
  region: Region[];
}

interface RegionApiResponse {
  success: boolean;
  message: string;
  data: {
    [key: string]: CityData;
  };
}

interface FormData {
  title: string;
  description: string;
  category: string;
  location: string;
  address: string;
  target: string;
  schedule: string;
  etc: string;
  siteUrl: string;
  contact: string;
  selectedRegionId: number | null;
  selectedPrefectureId: number | null;
}

// 요일별 상세 정보 인터페이스
interface DayDetail {
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
}

// 요일 데이터
const daysOfWeek = [
  { label: "月", key: "mon", name: "월요일" },
  { label: "火", key: "tue", name: "화요일" },
  { label: "水", key: "wed", name: "수요일" },
  { label: "木", key: "thu", name: "목요일" },
  { label: "金", key: "fri", name: "금요일" },
  { label: "土", key: "sat", name: "토요일" },
  { label: "日", key: "sun", name: "일요일" },
];

export default function TaisoWrite() {
  // API에서 가져온 지역 데이터
  const [regionData, setRegionData] = useState<
    RegionApiResponse["data"] | null
  >(null);
  const [loading, setLoading] = useState(true);

  const accessToken = window.localStorage.getItem("accessToken");

  console.log(accessToken, "sdashjdsa");

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
    address: "",
    location: "",
    target: "",
    schedule: "",
    etc: "",
    siteUrl: "",
    contact: "",
    selectedRegionId: null,
    selectedPrefectureId: null,
  });

  // 요일별 상세 정보
  const [dayDetails, setDayDetails] = useState<DayDetail>({
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
    sun: "",
  });

  // API에서 지역 데이터 가져오기
  useEffect(() => {
    const fetchJapanRegion = async () => {
      try {
        setLoading(true);
        const response = await api.get<RegionApiResponse>("/region");
        console.log(response.data, "response data");

        if (response.data.success) {
          setRegionData(response.data.data);
        }
      } catch (error) {
        console.log(error, "에러");
        // CORS 에러 등으로 API 호출 실패 시 기본 데이터 사용
        console.warn("API 호출 실패, 기본 데이터를 사용합니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchJapanRegion();
  }, []);

  const handleRegionChange = (event: SelectChangeEvent) => {
    const regionName = event.target.value;
    setSelectedRegion(regionName);
    setSelectedPrefecture(""); // 지역 변경시 하위 지역 초기화

    // 선택된 지역의 cityId 가져오기
    let regionId = null;
    if (regionData && regionData[regionName]) {
      regionId = regionData[regionName].cityId;
    }

    setFormData((prev) => ({
      ...prev,
      selectedRegion: regionName,
      selectedPrefecture: "",
      selectedRegionId: regionId,
      selectedPrefectureId: null,
    }));
  };

  const handlePrefectureChange = (event: SelectChangeEvent) => {
    const prefectureName = event.target.value;
    setSelectedPrefecture(prefectureName);

    // 선택된 현의 regionId 찾기
    let prefectureId = null;
    if (regionData && selectedRegion) {
      const selectedRegionData = regionData[selectedRegion];
      const selectedPrefectureData = selectedRegionData.region.find(
        (region) => region.regionName.trim() === prefectureName
      );

      if (selectedPrefectureData) {
        prefectureId = selectedPrefectureData.regionId;
      }
    }

    setFormData((prev) => ({
      ...prev,
      selectedPrefecture: prefectureName,
      selectedPrefectureId: prefectureId,
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

  // 요일별 상세 정보 변경 핸들러
  const handleDayDetailChange =
    (dayKey: keyof DayDetail) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDayDetails((prev) => ({
        ...prev,
        [dayKey]: event.target.value,
      }));
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
    try {
      // regionId와 cityId 유효성 검사
      if (!formData.selectedRegionId || !formData.selectedPrefectureId) {
        alert("地域と都道府県を選択してください。");
        return;
      }

      if (!accessToken) {
        alert("로그인이 필요합니다.");
        // 예: 로그인 페이지로 리디렉션
        // window.location.href = "/login";
        return;
      }

      const submitFormData = new FormData();
      submitFormData.append("title", formData.title);
      submitFormData.append("description", formData.description);
      submitFormData.append("event", formData.category);
      submitFormData.append("location", formData.location);
      submitFormData.append("address", formData.address);
      submitFormData.append("target", formData.target);
      submitFormData.append("etc", formData.etc || "");
      submitFormData.append("siteUrl", formData.siteUrl || "");
      submitFormData.append("contact", formData.contact || "");
      submitFormData.append("regionId", String(formData.selectedRegionId));
      submitFormData.append("cityId", String(formData.selectedPrefectureId));
      submitFormData.append("detail", JSON.stringify(dayDetails));

      imageFiles.forEach((file) => {
        submitFormData.append("images", file);
      });

      const response = await api.post<CreateBoardResponse>(
        "/board",
        submitFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("체조장이 성공적으로 등록되었습니다!");
      // 폼 초기화
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        address: "",
        target: "",
        schedule: "",
        etc: "",
        siteUrl: "",
        contact: "",
        selectedRegionId: null,
        selectedPrefectureId: null,
      });
      setDayDetails({
        mon: "",
        tue: "",
        wed: "",
        thu: "",
        fri: "",
        sat: "",
        sun: "",
      });
      setSelectedRegion("");
      setSelectedPrefecture("");
      setImageFiles([]);
      setImagePreviews([]);
    } catch (error: any) {
      console.error("등록 실패:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      alert(
        `등록 중 오류가 발생했습니다: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // 사용 가능한 현 목록 계산
  const availablePrefectures =
    selectedRegion && regionData ? regionData[selectedRegion].region : [];

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

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
              {regionData &&
                Object.keys(regionData).map((region) => (
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
                <MenuItem
                  key={prefecture.regionId}
                  value={prefecture.regionName.trim()}
                >
                  {prefecture.regionName}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Box>

        {/* 제목 */}
        <StyledTextField
          fullWidth
          label="タイトル"
          value={formData.title}
          onChange={handleInputChange("title")}
          required
        />

        {/* 설명 */}
        <StyledTextField
          fullWidth
          label="説明"
          value={formData.description}
          onChange={handleInputChange("description")}
          multiline
          rows={4}
          required
        />

        {/* 종목 */}
        <StyledTextField
          fullWidth
          label="種目"
          value={formData.category}
          onChange={handleInputChange("category")}
          required
        />

        {/* 활동 장소 */}
        <StyledTextField
          fullWidth
          label="活動場所"
          value={formData.address}
          onChange={handleInputChange("address")}
          required
        />

        {/* 주소 */}
        <StyledTextField
          fullWidth
          label="住所"
          value={formData.location}
          onChange={handleInputChange("location")}
          required
        />

        {/* 대상 */}
        <StyledTextField
          fullWidth
          label="対象"
          value={formData.target}
          onChange={handleInputChange("target")}
          required
        />

        {/* 요일별 상세 일정 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
            開催日時 詳細
          </Typography>
          <Grid container spacing={2}>
            {daysOfWeek.map((day) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={day.key}>
                <StyledTextField
                  fullWidth
                  label={`${day.label}曜日`}
                  value={dayDetails[day.key as keyof DayDetail]}
                  onChange={handleDayDetailChange(day.key as keyof DayDetail)}
                  placeholder="例: 9:00-10:00"
                  size="small"
                />
              </Grid>
            ))}
          </Grid>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: "block" }}
          >
            운영하지 않는 요일은 비워두세요.
            (運営しない曜日は空欄にしてください)
          </Typography>
        </Box>

        {/* 전체 일정 설명 */}
        <StyledTextField
          fullWidth
          label="全体スケジュール説明"
          value={formData.schedule}
          onChange={handleInputChange("schedule")}
          multiline
          rows={2}
        />

        {/* 비고 */}
        <StyledTextField
          fullWidth
          label="備考"
          value={formData.etc}
          onChange={handleInputChange("etc")}
          multiline
          rows={2}
        />

        {/* 홈페이지 */}
        <StyledTextField
          fullWidth
          label="ホームページ"
          value={formData.siteUrl}
          onChange={handleInputChange("siteUrl")}
          placeholder="https://www.example.com"
        />

        {/* 문의처 */}
        <StyledTextField
          fullWidth
          label="お問い合わせ"
          value={formData.contact}
          onChange={handleInputChange("contact")}
          placeholder="例: email@example.com"
        />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
            写真
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
            複数の画像を選択できます。
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
    "&.Mui-focused": {
      outline: "none",
    },
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
  "& *:focus": {
    outline: "none !important",
  },
}));
