import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent } from "@material-ui/core";

const useStyles = color => {
  if (color) {
    const useCardStyles = makeStyles(theme => ({
      root: {
        border: `3px solid ${theme.palette[color].main}`
      }
    }));
    const useCardHeaderStyles = makeStyles(theme => ({
      root: {
        backgroundColor: `${theme.palette[color].main}`
      }
    }));
    return { useCardStyles, useCardHeaderStyles };
  } else {
    const useCardStyles = makeStyles(theme => ({
      root: {}
    }));
    const useCardHeaderStyles = makeStyles(theme => ({
      root: {}
    }));
    return { useCardStyles, useCardHeaderStyles };
  }
};

const GameCard = ({ title, color, children }) => {
  const { useCardStyles, useCardHeaderStyles } = useStyles(color);
  const cardClasses = useCardStyles();
  const headerClasses = useCardHeaderStyles();

  return (
    <Card classes={{ root: cardClasses.root }}>
      <CardHeader
        classes={{ root: headerClasses.root }}
        title={title}
      ></CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default GameCard;
