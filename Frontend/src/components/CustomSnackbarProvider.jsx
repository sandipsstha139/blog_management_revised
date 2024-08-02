"use client"; // This directive makes sure the file is treated as a client component

import { SnackbarProvider } from "notistack";

export default function CustomSnackbarProvider({ children }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      {children}
    </SnackbarProvider>
  );
}

// customizing
// // import React from 'react';
// import { SnackbarProvider } from 'notistack';
// import { MaterialDesignContent } from 'notistack';
// import { styled } from '@mui/material/styles';

// const StyledMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
//   '&.notistack-MuiContent-success': {
//     backgroundColor: '#2D7738', // Custom color for success variant
//   },
//   '&.notistack-MuiContent-error': {
//     backgroundColor: '#970C0C', // Custom color for error variant
//   },
// }));

// function CustomSnackbarProvider({ children }) {
//   return (
//     <SnackbarProvider
//       Components={{
//         success: StyledMaterialDesignContent,
//         error: StyledMaterialDesignContent,
//       }}
//     >
//       {children}
//     </SnackbarProvider>
//   );
// }

// export default CustomSnackbarProvider;
