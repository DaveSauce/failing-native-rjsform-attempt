// import { colors } from "src/const/colors";
import {styled} from 'styled-components/native';

// NOTE: replace this with FieldBox from FormStyles.tsx if you ever need to support left labels
export const FieldBox = styled.View`
  margin-bottom: ${({theme}) => theme?.rjsForm?.fieldGapVertical ?? 50}px;
`;

// export const ArrayBase = styled.div`
//   legend {
//     display: none;
//   }
// `;
// export const ArrayGroup = styled.div<{ $fade: boolean }>`
//   opacity: ${({ $fade }) => ($fade ? 0 : 1)};
// `;
// export const AddButtonBox = styled.div`
//   margin-top: -10px;
//   padding-bottom: 50px;
// `;
// export const HeaderButtons = styled.div`
//   display: flex;
//   gap: 10px;
// `;
