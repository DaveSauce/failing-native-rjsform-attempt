import React, { useState } from "react";
import { ArrayFieldTemplateProps } from "@rjsf/utils";
import { Separator, TitleGroup } from "src/components/Form/FormStyles";
import { HeadingH3 } from "src/const/text";
import { TextButton } from "src/components/Button";
import { AddButtonBox, ArrayBase, ArrayGroup, HeaderButtons } from "./../RJSFormStyles";
import { AddButton } from "src/configuredComponents/AddButton";
import { HandleRemoveProps } from "./../types";
import { IconButton } from "src/components/IconButton";
import { CaretDown, CaretUp } from "src/components/Icons";

export const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const { canAdd, idSchema, items, onAddClick, title } = props;
  const [removingIndices, setRemovingIndices] = useState<Set<number>>(new Set());

  const displayTitle = title || idSchema.$id.split("_").pop();

  const handleRemove = ({ event, index }: HandleRemoveProps) => {
    // Mark this index as "removing"
    setRemovingIndices((prev) => new Set(Array.from(prev).concat([index])));

    // Wait for the animation to finish, then proceed with the actual removal
    setTimeout(() => {
      items[index].onDropIndexClick(index)();
      setRemovingIndices((prev) => {
        const updated = new Set(Array.from(prev));
        updated.delete(index);
        return updated;
      });
    }, 400);
  };

  return (
    <ArrayBase>
      {items.map((element, index) => (
        <ArrayGroup key={element.index} $fade={removingIndices.has(index)}>
          <Separator $marginString={"0 0 26px"} />
          <TitleGroup $roomForRemove>
            <HeadingH3>{`${displayTitle} (${index + 1})`}</HeadingH3>
            <HeaderButtons>
              {element.hasMoveDown && <IconButton Icon={CaretDown} onClick={element.onReorderClick(element.index, element.index + 1)} />}
              {element.hasMoveUp && <IconButton Icon={CaretUp} onClick={element.onReorderClick(element.index, element.index - 1)} />}
              {element.hasRemove && <TextButton onClick={(event) => handleRemove({ event, index })} text="Remove" />}
            </HeaderButtons>
          </TitleGroup>
          {element.children}
        </ArrayGroup>
      ))}
      {canAdd && (
        <AddButtonBox>
          <AddButton onClick={onAddClick} text={`Add ${displayTitle}`} />
        </AddButtonBox>
      )}
    </ArrayBase>
  );
};
