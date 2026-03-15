import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParamList, Product } from '../types';
import { searchProducts } from '../services/shopify';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { ProductCard, EmptyState, LoadingSpinner, Kara3Logo } from '../components';

type Props = NativeStackScreenProps<SearchStackParamList, 'Search'>;

const SUGGESTED_SEARCHES = ['Rings', 'Necklaces', 'Diamond', 'Gold', 'Earrings', 'Bangles'];

export const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

  const performSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setHasSearched(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    setHasSearched(true);
    const data = await searchProducts(q);
    setResults(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      performSearch(query);
    }, 350);
    return () => clearTimeout(debounceTimer.current);
  }, [query, performSearch]);

  const goToProduct = useCallback(
    (id: string) => {
      Keyboard.dismiss();
      navigation.navigate('ProductDetail', { productId: id });
    },
    [navigation]
  );

  const handleSuggestion = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Kara3Logo size="sm" color={Colors.teal} />
        <Text style={styles.title}>Search</Text>
      </View>

      {/* Search input */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color={Colors.textMuted} style={styles.searchIcon} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Search jewelry, materials, styles..."
          placeholderTextColor={Colors.textMuted}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      {!hasSearched ? (
        <View style={styles.suggestions}>
          <Text style={styles.suggestTitle}>Popular Searches</Text>
          <View style={styles.chips}>
            {SUGGESTED_SEARCHES.map((term) => (
              <TouchableOpacity
                key={term}
                style={styles.chip}
                onPress={() => handleSuggestion(term)}
              >
                <Ionicons name="trending-up-outline" size={13} color={Colors.teal} />
                <Text style={styles.chipText}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : loading ? (
        <LoadingSpinner />
      ) : results.length === 0 ? (
        <EmptyState
          icon="search-outline"
          title={`No Results for "${query}"`}
          subtitle="Try searching for a material, product type, or style."
        />
      ) : (
        <>
          <Text style={styles.resultCount}>
            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </Text>
          <FlatList
            data={results}
            keyExtractor={(p) => p.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProductCard product={item} onPress={() => goToProduct(item.id)} />
            )}
          />
        </>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.base,
    marginTop: Spacing.base,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
    padding: 0,
  },
  suggestions: {
    paddingHorizontal: Spacing.base,
  },
  suggestTitle: {
    ...Typography.label,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.md,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  chipText: {
    ...Typography.label,
    color: Colors.textSecondary,
  },
  resultCount: {
    ...Typography.caption,
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.md,
  },
  row: {
    paddingHorizontal: Spacing.base,
    justifyContent: 'space-between',
  },
  list: {
    paddingBottom: Spacing.xxl,
  },
});
