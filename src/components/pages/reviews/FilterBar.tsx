import { useState, useRef, useEffect, useCallback, type ChangeEvent } from "react";
import { Box, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type { SelectChangeEvent } from "@mui/material/Select";

import { createStyles } from "../../../styles/pages/reviews/FilterBarStyles";
import type { RatingOption } from "../../../models/reviews-model";

interface FilterBarProps {
  keyword: string;
  rating: RatingOption;
  onKeywordChange: (keyword: string) => void;
  onRatingChange: (rating: RatingOption) => void;
  onClearFilters: () => void;
}

const RATING_OPTIONS: { value: RatingOption; label: string }[] = [
  { value: "all", label: "All ratings" },
  { value: "5", label: "★★★★★  5 stars" },
  { value: "4", label: "★★★★☆  4 stars" },
  { value: "3", label: "★★★☆☆  3 stars" },
  { value: "2", label: "★★☆☆☆  2 stars" },
  { value: "1", label: "★☆☆☆☆  1 star" },
];

export default function FilterBar({ keyword, rating, onKeywordChange, onRatingChange, onClearFilters }: FilterBarProps) {
  const styles = createStyles();

  const [inputValue, setInputValue] = useState(keyword);

  useEffect(() => {
    setInputValue(keyword);
  }, [keyword]);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null); // Ref to store debounce timer

  const handleKeywordInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onKeywordChange(value);
      }, 400);
    },
    [onKeywordChange]
  );

  const handleRatingChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      onRatingChange(e.target.value as RatingOption);
    },
    [onRatingChange]
  );

  const hasActiveFilters = keyword.trim().length > 0 || rating !== "all";

  return (
    <Box
      sx={styles.BoxMain}
    >
      <TextField value={inputValue} onChange={handleKeywordInput} placeholder="Filter by keyword…" size="small" fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            )
          },
          htmlInput:{
            maxLength: 250
          }
        }}
        sx={styles.TextFieldMain}
      />

      <FormControl size="small" sx={styles.FormControlMain}>
        <InputLabel id="rating-label">Rating</InputLabel>
        <Select labelId="rating-label" value={rating} label="Rating" onChange={handleRatingChange}>
          {RATING_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button size="large" variant="outlined" onClick={onClearFilters} disabled={!hasActiveFilters} sx={styles.ClearFiltersButton}>
        Clear filters
      </Button>
    </Box>
  );
};
