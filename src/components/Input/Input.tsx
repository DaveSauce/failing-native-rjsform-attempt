import React from 'react';
import styled from 'styled-components/native';
import {KeyboardTypeOptions, TextInputProps} from 'react-native';

const StyledInput = styled.TextInput`
  height: 40px;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  border-radius: 4px;
`;

interface InputProps extends TextInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholderTextColor?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  clearButtonMode?: 'never' | 'while-editing' | 'unless-editing' | 'always';
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholderTextColor = '#888',
  autoCapitalize = 'none',
  autoCorrect = false,
  clearButtonMode = 'while-editing',
  keyboardType = 'default',
  returnKeyType = 'done',
}) => {
  return (
    <StyledInput
      value={value}
      onChangeText={onChange}
      placeholderTextColor={placeholderTextColor}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      clearButtonMode={clearButtonMode}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
    />
  );
};
