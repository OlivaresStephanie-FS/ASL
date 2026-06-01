use std::time::{SystemTime, UNIX_EPOCH};

fn main() {
    println!("Hello ASL!");

    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap();

    println!("Current timestamp: {}", now.as_secs());
}