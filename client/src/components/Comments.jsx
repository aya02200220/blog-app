import React from "react";
import { format } from "date-fns";

import {
  Box,
  Input,
  Typography,
  Button,
  IconButton,
  Divider,
  Skeleton,
  CircularProgress,
  TextField,
} from "@mui/material";
import { LoginIcon } from "./LoginIcon";

export const Comments = ({ contents }) => {
  const author = contents.author || {};
  const {
    _id: authorId = "", // default to empty string if _id does not exist
    firstName = "", // default to empty string if firstName does not exist
    lastName = "", // default to empty string if lastName does not exist
    userIcon = "", // default to empty string if userIcon does not exist
  } = author;
  const content = contents.content || "";
  const createdAt = contents.createdAt || "";
  const updatedAt = contents.updatedAt || "";
  const _id = contents._id || "";

  const firstLetter = firstName ? firstName.charAt(0) : "";
  const lastLetter = lastName ? lastName.charAt(0) : "";
  const formattedCreatedAt = createdAt
    ? format(new Date(createdAt), "MMM d , yyyy")
    : "";

  return (
    <>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ mt: "3px", width: "12%" }}>
          <LoginIcon
            firstLetter={firstLetter}
            lastLetter={lastLetter}
            userIcon={userIcon}
          />
        </Box>
        <Box sx={{ width: "88%" }}>
          <Box
            sx={{
              border: "solid 1px gray",
              p: "8px 15px",
              borderRadius: "4px",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
              <Typography>{firstName}</Typography>
              <Typography>{lastName}</Typography>
              <Typography sx={{ ml: 1, color: "gray" }}>
                {formattedCreatedAt}
              </Typography>
            </Box>

            <Typography
              sx={{ lineHeight: "19px", mt: 1, wordWrap: "break-word" }}
            >
              {content}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
