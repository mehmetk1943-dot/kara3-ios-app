import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CollectionsStackParamList, Collection } from '../types';
import { getCollections } from '../services/shopify';
import { Colors, Typography, Spacing } from '../theme';
import { CollectionCard, LoadingSpinner, EmptyState, Kara3Logo } from '../components';

type Props = NativeStackScreenProps<CollectionsStackParamList, 'Collections'>;

export const CollectionsScreen: React.FC<Props> = ({ navigation }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollections().then((data) => {
      setCollections(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Kara3Logo size="sm" color={Colors.teal} />
        <Text style={styles.title}>Collections</Text>
      </View>

      {collections.length === 0 ? (
        <EmptyState
          icon="grid-outline"
          title="No Collections Yet"
          subtitle="New collections are being curated. Check back soon."
        />
      ) : (
        <FlatList
          data={collections}
          keyExtractor={(c) => c.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CollectionCard
              collection={item}
              onPress={() =>
                navigation.navigate('ProductList', {
                  collectionId: item.id,
                  collectionTitle: item.title,
                })
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: 'center',
  },
  title: {
    ...Typography.displayMedium,
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
  },
  list: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.xxl,
  },
});
