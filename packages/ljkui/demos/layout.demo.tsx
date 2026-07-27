import React from 'react';
import { Avatar, Badge, Button, Card, HStack, Spacer, Typography, VStack, ZStack } from 'ljkui';

export default function LayoutDemo() {
  return (
    <Card size="3" className="w-85">
      <VStack spacing={16} alignment="leading">
        <HStack spacing={8} className="w-full">
          <Typography.Heading size="4">Members</Typography.Heading>
          <Spacer />
          <Button size="1" variant="soft">
            Invite
          </Button>
        </HStack>

        <HStack spacing={12}>
          <ZStack alignment="bottomTrailing">
            <Avatar size="4" fallback="LK" color="indigo" />
            <Badge color="green" variant="solid" size="1">
              on
            </Badge>
          </ZStack>
          <VStack spacing={2} alignment="leading">
            <Typography.Text size="2" weight="bold">
              Lucas Knight
            </Typography.Text>
            <Typography.Text size="1" color="gray">
              Online now
            </Typography.Text>
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
}
