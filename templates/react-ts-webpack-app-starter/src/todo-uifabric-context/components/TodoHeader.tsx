import * as React from 'react';
import { Stack, Text, Pivot, PivotItem, TextField, PrimaryButton } from 'office-ui-fabric-react';
import { FilterTypes } from '../store';
import { TodoContext } from '../TodoContext';
import { ReactNode } from 'react';

interface ITodoHeaderState {
  labelInput: string;
}

export class TodoHeader extends React.Component<{}, ITodoHeaderState> {
  public context!: React.ContextType<typeof TodoContext>;

  constructor(props: {}) {
    super(props);
    this.state = { labelInput: undefined };
  }

  public render(): ReactNode {
    return (
      <Stack gap={10}>
        <Stack horizontal horizontalAlign="center">
          <Text variant="xxLarge">
            todos <Text variant="mediumPlus">(2.4 demo)</Text>
          </Text>
        </Stack>

        <Stack horizontal gap={10}>
          <Stack.Item grow>
            <TextField
              placeholder="What needs to be done?"
              value={this.state.labelInput}
              onChange={this.onChange}
              styles={props => ({
                ...(props.focused && {
                  field: {
                    backgroundColor: '#c7e0f4',
                  },
                }),
              })}
            />
          </Stack.Item>
          <PrimaryButton onClick={this.onAdd}>Add</PrimaryButton>
        </Stack>

        <Pivot onLinkClick={this.onFilter}>
          <PivotItem headerText="all" />
          <PivotItem headerText="active" />
          <PivotItem headerText="completed" />
        </Pivot>
      </Stack>
    );
  }

  private onAdd = () => {
    this.context.addTodo(this.state.labelInput);
    this.setState({ labelInput: undefined });
  };

  private onChange = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string) => {
    this.setState({ labelInput: newValue });
  };

  private onFilter = (item: PivotItem) => {
    this.context.setFilter(item.props.headerText as FilterTypes);
  };
}

TodoHeader.contextType = TodoContext;
