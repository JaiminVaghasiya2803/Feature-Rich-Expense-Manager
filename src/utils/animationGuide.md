# Animation Guide

## Avoiding Native Driver Conflicts

The error "Attempting to run JS driven animation on animated node that has been moved to 'native'" occurs when you mix `useNativeDriver: true` and `useNativeDriver: false` on the same animated value or in parallel animations.

### Rules to Follow:

1. **Transform animations** (scale, translate, rotate) → `useNativeDriver: true`
2. **Color animations** (backgroundColor, borderColor) → `useNativeDriver: false`
3. **Layout animations** (width, height, padding) → `useNativeDriver: false`

### Safe Patterns:

#### ✅ Separate Animated Views
```tsx
// Good: Separate animated views for different driver types
<Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
  <Animated.View style={{ borderColor: colorAnim }}>
    <TextInput />
  </Animated.View>
</Animated.View>
```

#### ✅ Sequential Animations
```tsx
// Good: Run animations sequentially
Animated.timing(colorAnim, { useNativeDriver: false }).start(() => {
  Animated.spring(scaleAnim, { useNativeDriver: true }).start();
});
```

#### ❌ Mixed Parallel Animations
```tsx
// Bad: Mixing native drivers in parallel
Animated.parallel([
  Animated.timing(colorAnim, { useNativeDriver: false }),
  Animated.spring(scaleAnim, { useNativeDriver: true }),
]).start();
```

### Using InteractionManager

Always wrap animations in `InteractionManager.runAfterInteractions()` for better performance:

```tsx
InteractionManager.runAfterInteractions(() => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  }).start();
});
```

### Custom Hooks

Use the provided animation hooks for consistent behavior:

- `useEntranceAnimation()` - For component entrance effects
- `usePressAnimation()` - For button press effects
- `useAnimations()` - For general animation management

### Performance Tips:

1. Use `useNativeDriver: true` whenever possible
2. Avoid animating layout properties
3. Use `InteractionManager` for non-critical animations
4. Keep animation durations reasonable (200-500ms)
5. Use spring animations for natural feel