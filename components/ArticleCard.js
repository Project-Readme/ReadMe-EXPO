import React from 'react';
import styled from 'styled-components';

const ArticleCard = props => (
  <Container>
    <Image source={props.image} resizeMode="contain" />
    <Text>{props.text}</Text>
  </Container>
);

export default ArticleCard;

const Container = styled.View`
  flex-direction: row;
  background: white;
  height: 60px;
  padding: 12px 16px 12px;
  border-radius: 10px;
  align-items: center;
  margin: 0 8px;
`;

const Image = styled.Image`
  width: 36px;
  height: 36px;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 14px;
  margin-left: 8px;
  flex: 1;
  flex-wrap: wrap;
`;
